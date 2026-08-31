/**
 * 单景点 SEO 实体绑定配置变量表
 * ============================================
 * 将下方配置替换为具体景点数据后，全站
 * （TDK / JSON-LD / OG / 地图 / PWA / 正文语义）自动生效。
 *
 * 本景点：Salinas y Arenales de San Pedro del Pinatar
 *         (Parque Regional de las Salinas y Arenales de San Pedro del Pinatar)
 * 地区：San Pedro del Pinatar, Región de Murcia, España
 */
export const siteConfig = {
  // {{DOMAIN_NAME}}
  domain: 'salinasyarenalesdesanpedrodelpinatar.com',
  baseUrl: 'https://salinasyarenalesdesanpedrodelpinatar.com',

  // 实体绑定
  attraction: {
    // {{ATTRACTION_FULL_NAME}} —— 景点官方全称
    fullName: 'Parque Regional de las Salinas y Arenales de San Pedro del Pinatar',
    // {{ATTRACTION_SHORT_NAME}} —— 景点常用俗称 / 域名含义
    shortName: 'Salinas y Arenales de San Pedro del Pinatar',
    type: 'Ecological Park',
  },

  // {{CITY_NAME}} / {{STATE_PROVINCE}} / {{COUNTRY_NAME}} / {{COUNTRY_CODE_2LETTER}} / {{POSTAL_CODE}}
  location: {
    city: 'San Pedro del Pinatar',
    region: 'Murcia',
    country: 'Spain',
    countryCode: 'ES',
    postalCode: '30740',
    // {{LATITUDE}} / {{LONGITUDE}} —— 来自 Google Maps Embed pb 坐标
    latitude: 37.8328203,
    longitude: -0.7675424,
    plusCode: 'R6MJ+4X',
  },

  // {{MAPS_SHARE_URL}} / {{MAPS_EMBED_SRC}}
  mapsUrl: 'https://maps.app.goo.gl/evq26chDcWZXhCYn7',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.1736544937394!2d-0.7675424!3d37.83282030000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd630ffc8fa4c201%3A0xcf71e4ccf88b6732!2sSalinas%20y%20Arenales%20de%20San%20Pedro%20del%20Pinatar!5e0!3m2!1szh-CN!2s!4v1788156000226!5m2!1szh-CN!2s',

  // {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}} —— 周边核心地标
  nearbyLandmarks: ['Mar Menor', 'Playa de la Llana'],

  // {{GOVT_TOURISM_URL}} —— 当地政府/官方旅游局链接
  govtTourismUrl: 'https://www.murciaturistica.es/',

  // 首屏背景图（OG/JSON-LD image 引用）
  heroImage: '/gallery/salinas-1.jpg',

  // 评分
  rating: '4.6',
  reviewCount: '12499',
};

export type SiteConfig = typeof siteConfig;
