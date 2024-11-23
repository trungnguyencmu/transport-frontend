import Colors from "./Colors";

export const themeAntd = {
  hashed: false,
  components: {
    Breadcrumb: {
      lastItemColor: Colors.secondary,
      linkColor: Colors.primaryText,
    },
    DatePicker: {
      controlHeight: 40,
      controlHeightLG: 44,
      controlHeightSM: 32,
      borderRadius: 8,
      colorBgContainer: Colors.background,
      inputFontSizeLG: 14,
      fontSizeLG: 14,
      colorPrimary: Colors.secondary,
    },
    Radio: {
      colorPrimary: Colors.primary,
      colorBgContainer: Colors.white,
      colorBorder: Colors.gray,
      dotSize: 8,
      lineWidth: 2,
      controlHeightLG: 44,
      buttonCheckedColorDisabled: Colors.primary,
      dotColorDisabled: Colors.primary,
    },
    Input: {
      hoverBorderColor: Colors.primary,
      hoverBg: Colors.input,
      controlHeight: 44,
      colorBorder: Colors.background,
      colorBgContainer: Colors.background,
    },
    Button: {
      /* here is your component tokens */
      controlHeight: 44,
      controlHeightSM: 32,
      fontWeight: 700,
      borderRadius: 8,
      paddingInlineSM: 12,
      defaultShadow: 'none',
      primaryShadow: 'none',
    },
    Table: {
      headerBorderRadius: 0,
      headerSplitColor: 'none',
    },
    Card: {
      headerHeight: 72,
      borderRadiusLG: 8,
    },
    Select: {
      optionHeight: 44,
      controlHeight: 44,
      selectorBg: Colors.background,
      colorBorder: 'none',
      controlHeightSM: 32,
    },
    Layout: {
      siderBg: Colors.primary,
      lightSiderBg: Colors.primary,
      lightTriggerBg: Colors.primary,
      triggerBg: Colors.primary,
      triggerColor: Colors.primary,
      headerPadding: '0 24px',
      // triggerHeight: 52,

      // triggerColor: Colors.primary,
      /* here is your component tokens */
    },
    Menu: {
      // darkItemBg: Colors.primary,
      // darkItemColor: Colors.white,
      // darkItemSelectedBg: Colors.white,
      // darkItemSelectedColor: Colors.primary,
      // darkSubMenuItemBg: Colors.white,
      // itemColor: Colors.white,
      // itemSelectedBg: Colors.white,
      // itemHoverColor: Colors.white,
      subMenuItemBg: Colors.white,
      iconSize: 24,
      // itemActiveBg: Colors.primary,
      itemHeight: 44,
      horizontalItemBorderRadius: 16,
      subMenuItemBorderRadius: 16,
      borderRadiusLG: 4,
      fontWeight: 700,
      collapsedIconSize: 24,
      itemMarginBlock: 16,
      itemBg: Colors.primary,
      // itemSelectedColor: Colors.primary,
    },
    Segmented: {
      itemSelectedBg: Colors.primary,
      itemSelectedColor: Colors.white,
    },
    Tooltip: {
      colorBgSpotlight: Colors.white,
      colorTextLightSolid: Colors.black,
    },
    Pagination: {
      itemActiveBg: Colors.primary,
      colorPrimary: Colors.white,
      colorText: Colors.gray,
      colorPrimaryHover: Colors.white,
    },
    Switch: {
      trackHeight: 24,
      handleSize: 12,
      trackPadding: 4,
      colorTextQuaternary: '#CCDCDE',
      // handleBg: Colors.primary,
    },
    Modal: {
      borderRadiusLG: 4,
    },
  },
  token: {
    // Seed Token
    fontFamily: 'Work Sans, sans-serif',
    colorPrimary: Colors.primary,
    colorBorderSecondary: Colors.separator,
    borderRadiusLG: 0,
    colorPrimaryBorder: Colors.danger,
  },
};