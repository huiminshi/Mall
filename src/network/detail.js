import {request} from './request'

export function getRecommends() {
  return request({
    url: '/recommend'
  })
}
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.desc = itemInfo.desc;
    this.columns = columns;
    this.services = services;
    this.realLowPrice = itemInfo.lowNowPrice;
  }
}
export class GoodsParam{
  constructor(info, rule) {
    this.image = info.images ? info.images: '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
