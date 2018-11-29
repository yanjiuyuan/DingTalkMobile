import pub from '/util/public';



Page({
  data: {
    ...pub.func,
    pageName: 'API/index',
    hidden: true,
    curIndex: 0,
    ...pub.data,
    arr: {
      onItemTap: 'onGridItemTap',
      onChildItemTap: 'onChildItemTap',
      list: [{
        icon: '/image/api_open.png',
        title: '开放接口',
        entitle: 'Open API',
        subs: [{
          title: '获取授权码',
          entitle: 'getAuthCode',
          page: '../get-auth-code/get-auth-code'
        },
        ],
      }, {
        icon: '/image/api_view.png',
        title: '界面',
        entitle: 'Interface',
        subs: [{
          title: '警告框',
          entitle: 'alert',
          page: '../alert/alert'
        }, {
          title: '确认框',
          entitle: 'confirm',
          page: '../confirm/confirm'
        }, {
          title: '弱提示',
          entitle: 'toast',
          page: '../toast/toast'
        }, {
          title: '加载提示',
          entitle: 'loading',
          page: '../loading/loading'
        }, {
          title: '操作菜单',
          entitle: 'showActionSheet',
          page: '../action-sheet/action-sheet'
        }, {
          title: '设置界面导航栏',
          entitle: 'setNavigationBar',
          page: '../set-navigation-bar/set-navigation-bar'
        },
        {
          title: '页面跳转',
          entitle: 'navigateTo, navigateBack, switchTab, reLaunch',
          page: '../navigator/navigator'
        },
        {
          title: '创建动画',
          entitle: 'createAnimation',
          page: '../animation/animation'
        }, {
          title: '创建绘画',
          entitle: 'createCanvasContext',
          page: '../canvas/canvas'
        },
        {
          title: '选择日期',
          entitle: 'datePicker',
          page: '../date-picker/date-picker'
        },
        {
          title: '滚动页面',
          entitle: 'pageScrollTo',
          page: '../page-scroll-to/page-scroll-to'
        },
        {
          title: '节点位置',
          entitle: 'createSelectorQuery',
          page: '../create-selector-query/create-selector-query'
        },
        {
          title: '隐藏键盘',
          entitle: 'hideKeyboard',
          page: '../keyboard/keyboard'
        },
        ]
      },

      {
        icon: '/image/api_data.png',
        title: '缓存',
        entitle: 'Storage',
        page: '../storage/storage'
      },
      {
        icon: '/image/api_share.png',
        title: '自定义分享',
        entitle: 'Share',
        page: '../share/share'
      }
      ],
    }
  },
  onGridItemTap(e) {
    const curIndex = e.currentTarget.dataset.index;
    const childList = this.data.arr.list[curIndex];
    if (childList.subs) {
      this.setData({
        hidden: !this.data.hidden,
        curIndex,
      });
      this.createMaskShowAnim();
      this.createContentShowAnim();
    } else {
      const e = {
        currentTarget: {
          dataset: { page: childList.page }
        }
      };
      this.onChildItemTap(e);
    }
  },
  onChildItemTap(e) {
    const { page } = e.currentTarget.dataset;
    dd.navigateTo({ url: page });
  },
  onModalCloseTap() {
    this.createMaskHideAnim();
    this.createContentHideAnim();
    setTimeout(() => {
      this.setData({
        hidden: true,
      });
    }, 210);
  },
});
