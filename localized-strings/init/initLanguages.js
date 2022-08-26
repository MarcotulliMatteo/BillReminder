import LocalizedStrings from "react-native-localization";

export default function initLanguages(languages = {}) : Object {
    return new LocalizedStrings(languages);
}