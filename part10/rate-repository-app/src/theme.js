
import { Platform } from "react-native";

import androidTheme from "./theme.android";
import iosTheme from "./theme.ios";

const theme = Platform.OS === "ios" ? iosTheme : androidTheme;

export default theme;
