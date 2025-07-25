import confirm from "@inquirer/confirm";
import input from "@inquirer/input";
import rawlist from "@inquirer/rawlist";
import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import { ExecSyncOptions, execSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const isContinue1 = process.argv.includes("--c1");
const isPreRelease = process.argv.includes("--pre");
const isSkipBuild = isContinue1 || process.argv.includes("--skip-build");
const isSkipCoreGenerate =
  isContinue1 || process.argv.includes("--skip-generate");

const exec = (command: string, opts?: ExecSyncOptions): void => {
  console.log(command);
  execSync(command, opts);
};

interface CreateReleaseOptions {
  body: string;
  version: string;
  override?: boolean;
  tagPrefix: string;
  prerelease: boolean;
}

async function getTagPrefix(): Promise<string> {
  if (
    !(await confirm({ message: "Use @react-md/core as the next tag name?" }))
  ) {
    return await input({
      message: "Enter the next tag name prefix",
    });
  }

  return "@react-md/core";
}

async function createRelease(options: CreateReleaseOptions): Promise<void> {
  const { version, body, tagPrefix, override, prerelease } = options;

  dotenv.config({ path: ".env.local", override });
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  try {
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/releases",
      {
        owner: "mlaursen",
        repo: "react-md",
        tag_name: `${tagPrefix}@${version}`,
        body,
        prerelease,
      }
    );

    console.log(`Created release: ${response.data.html_url}`);
  } catch (e) {
    console.error(e);

    console.log();
    console.log(
      "The npm token is most likely expired or never created. Update the `.env.local` to include the latest GITHUB_TOKEN"
    );
    console.log(
      "Regenerate the token: https://github.com/settings/tokens?type=beta"
    );
    if (
      !(await confirm({ message: "Try creating the Github release again?" }))
    ) {
      process.exit(1);
    }

    return createRelease({ ...options, override: true });
  }
}

async function getCurrentChangeset(disableAuto?: boolean): Promise<string> {
  let changesetName = "";
  if (!disableAuto) {
    changesetName = execSync("git diff --name-only @{upstream} .changeset/*.md")
      .toString()
      .trim();
  }

  if (
    !changesetName ||
    !(await confirm({
      message: `Is "${changesetName}" the correct changeset path?`,
    }))
  ) {
    const changesetNames = await readdir(".changeset");
    changesetName = await rawlist({
      message: "Select the changeset path",
      choices: changesetNames
        .filter((changeset) => changeset.endsWith(".md"))
        .map((changeset) => ({
          value: changeset,
        })),
    });
    changesetName = join(".changeset", changesetName);
  }

  return await readFile(changesetName, "utf8");
}

async function getReleaseVersion(): Promise<string> {
  const version = JSON.parse(
    await readFile(join("packages", "core", "package.json"), "utf8")
  ).version;

  if (
    await confirm({
      message: `Is "${version}" the next github release version?`,
    })
  ) {
    return version;
  }

  return await input({
    message: "Input the next release version for Github",
  });
}

if (!isSkipBuild) {
  exec("pnpm clean-dist");

  if (!isSkipCoreGenerate) {
    // exec("pnpm core-export-map");
    exec("pnpm core-index-file");
    exec("git add -u");
  }

  exec('pnpm build --filter="./packages/*"');
}

if (isPreRelease) {
  exec("pnpm changeset pre enter next");
}

exec("pnpm changeset", { stdio: "inherit" });
if (!(await confirm({ message: "Continue the release?" }))) {
  process.exit(1);
}

exec("git add -u");
exec("git add .changeset");

const changeset = await getCurrentChangeset();
exec("pnpm changeset version", { stdio: "inherit" });
exec("git add -u");
const version = await getReleaseVersion();
if (!(await confirm({ message: "Continue the release?" }))) {
  process.exit(1);
}

exec('git commit -m "build(version): version packages"');
exec("pnpm changeset publish", { stdio: "inherit" });
exec("git push --follow-tags");

await createRelease({
  body: changeset,
  tagPrefix: await getTagPrefix(),
  version,
  prerelease: isPreRelease || version.includes("-next"),
});
