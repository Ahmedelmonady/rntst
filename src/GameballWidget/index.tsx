import * as React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import Modal from 'react-native-modal';
import styles from './styles';
import { LanguageUtils } from './languageUtils';
import { API_ENDPOINTS, WEBVIEW_CONFIG } from '../constants';
const package_json = require('../../package.json');

interface Props {
  modal?: boolean;
  openDetail?: string;
  hideNavigation?: boolean;
}

interface State {
  api: string;
  refreshing: boolean;
  showModal: boolean;
}
type initFunctionParams = {
  apiKey: string;
  lang: string;
  shop?: string;
  platform?: string;
  openDetail?: string;
  apiPrefix?: string;
  widgetUrlPrefix?: string;
  customerId?: string;
  hideNavigation?: boolean;
  modal?: boolean;
  mainColor?: string;
  closeButtonColor?: string;
};
class GameballWidget extends React.Component<Props, State> {
  static apiPrefix: string = '';
  static widgetUrlPrefix: string = '';
  static apiKey: string = '';
  static lang: string = '';
  static customerId: string = '';
  static shop?: string = '';
  static platform?: string = '';
  static openDetail?: string = '';
  static hideNavigation?: boolean = false;
  static modal?: boolean = true;
  static mainColor: string | null = null;
  static closeButtonColor: string | null = null;

  private _isMounted: boolean = false;
  private webViewRef: WebView | null = null;

  constructor(props: Props) {
    super(props);
  }
  state: State = {
    api: '',
    refreshing: false,
    showModal: false,
  };

  static async init({
    apiKey,
    lang,
    shop,
    platform,
    openDetail,
    apiPrefix = API_ENDPOINTS.BASE_URL,
    widgetUrlPrefix = API_ENDPOINTS.WIDGET_BASE_URL,
    customerId,
    hideNavigation,
    modal = true,
    mainColor,
    closeButtonColor,
  }: initFunctionParams) {
    // Configure widget properties using Object.assign for cleaner code
    Object.assign(GameballWidget, {
      apiKey,
      lang,
      shop,
      platform,
      openDetail,
      apiPrefix,
      widgetUrlPrefix,
      hideNavigation,
      modal,
    });

    // Set optional properties conditionally
    if (customerId) {
      GameballWidget.customerId = customerId;
    }
    if (mainColor) {
      GameballWidget.mainColor = mainColor;
    }
    if (closeButtonColor) {
      GameballWidget.closeButtonColor = closeButtonColor;
    }
  }
  static initializeCustomer(customerId: string) {
    GameballWidget.customerId = customerId;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async onMessage(e: WebViewMessageEvent) {
    if (Platform.OS === 'ios') return;
    const { data } = e.nativeEvent;
    if (data.startsWith('share:')) {
      try {
        const param = JSON.parse(data.slice('share:'.length));
        if (param.url == null && param.text == null) {
          return;
        }
        await Share.share(
          {
            title: param.title,
            message: [param.text, param.url].filter(Boolean).join(' '), // join text and url if both exists
            url: param.url,
          },
          {
            dialogTitle: param.title,
            subject: param.title,
          }
        );
      } catch (e: unknown) {
        console.error(e);
      }
    }
  }

  renderWidgetComponent({
    params,
    scrollEnabled,
  }: {
    params: string;
    scrollEnabled: boolean;
  }) {
    const originWhitelist = [
      ...WEBVIEW_CONFIG.ALLOWED_ORIGINS,
      ...(GameballWidget.openDetail ? [GameballWidget.openDetail] : []),
    ];

    const injectedJavaScript = `
      (function() {
          document.body.style.webkitUserSelect = 'none';
          document.body.style.webkitTouchCallout = 'none'; 
          document.body.style.userSelect = 'none';
          document.addEventListener('contextmenu', function(e) { 
              e.preventDefault(); 
          });
      })();
      true; // Required for React Native WebView
    `;

    return (
      <WebView
        ref={(ref) => { this.webViewRef = ref; }}
        scrollEnabled={scrollEnabled}
        source={{ uri: `${GameballWidget.widgetUrlPrefix}?${params}` }}
        startInLoadingState
        useWebKit={true}
        originWhitelist={originWhitelist}
        showsVerticalScrollIndicator={false}
        onMessage={this.onMessage}
        androidHardwareAccelerationDisabled={false}
        onLoadEnd={() => {
          if (this.webViewRef) {
            this.webViewRef.injectJavaScript(injectedJavaScript);
          }
        }}
        injectedJavaScriptBeforeContentLoaded="
        if (navigator.share == null) {
          navigator.share = (param) => {
             window.ReactNativeWebView.postMessage('share:' + JSON.stringify(param));
          };
        };
        true;
        "
      />
    );
  }

  showProfile() {
    // Check if component is mounted before calling setState
    if (this._isMounted) {
      this.setState({ showModal: true });
    } else {
      // If not mounted, set initial state directly
      this.state = { ...this.state, showModal: true };
    }
  }

  render() {
    const {
      customerId,
      apiKey,
      lang,
      shop,
      platform,
      openDetail,
      hideNavigation,
      modal,
    } = GameballWidget;

    const mainColor = GameballWidget.mainColor;

    const params =
      `playerId=${customerId}&apiKey=${apiKey}&lang=${lang}` +
      `${shop ? `&shop=${shop}` : ''}` +
      `${platform ? `&platform=${platform}` : ''}` +
      `&os=${Platform.OS}` +
      `&sdk=React/${package_json.version}` +
      `${mainColor ? `&main=${mainColor}` : ''}` +
      `${openDetail ? `&openDetail=${openDetail}` : ''}` +
      `${hideNavigation ? `&hideNavigation=${hideNavigation}` : ''}`;

    const isRtl = LanguageUtils.isRtl(lang);
    const closeButtonColor = GameballWidget.closeButtonColor || '#CECECE';

    return modal ? (
      <Modal isVisible={this.state.showModal} style={styles.modalStyle}>
        <View style={styles.modalContainerStyle}>
          <TouchableOpacity
            onPress={() => this.setState({ showModal: false })}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={
              isRtl ? styles.closeButtonStyleRtl : styles.closeButtonStyleLtr
            }
          >
            <Image
              source={require('../Assets/close.png')}
              style={[styles.closeIconStyle, { tintColor: `${closeButtonColor}` }]}
            />
          </TouchableOpacity>
          <SafeAreaView style={styles.webviewStyle}>
            {this.renderWidgetComponent({ params, scrollEnabled: true })}
          </SafeAreaView>
        </View>
      </Modal>
    ) : (
      <SafeAreaView style={styles.flex_1}>
        {this.renderWidgetComponent({ params, scrollEnabled: false })}
      </SafeAreaView>
    );
  }
}

export default GameballWidget;
