import { ReactElement } from "react";
import { AppBar } from "@react-md/app-bar";

import AppBarTitle from "components/AppBarTitle";

import ClosePhone from "./ClosePhone";
import { usePhoneContext } from "./context";
import OptionsAction from "./OptionsAction";
import PhoneAppBar from "./PhoneAppBar";
import SearchAction from "./SearchAction";

export default function DefaultPhoneAppBar(): ReactElement {
  const { title } = usePhoneContext();
  return (
    <PhoneAppBar>
      <AppBar component="div" theme="clear">
        <ClosePhone />
        <AppBarTitle>{title}</AppBarTitle>
        <SearchAction />
        <OptionsAction />
      </AppBar>
    </PhoneAppBar>
  );
}
