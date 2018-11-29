import pub from '/util/public';


Page({
  ...pub.func,
  data: {
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
      },
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
