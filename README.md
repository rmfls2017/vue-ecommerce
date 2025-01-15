# vue-ecommerce

## Requirement

```shell
$ node --version

v18.20.4
```

```shell
$ npm install

added ... packages, and audited ... packages in 3s

... packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## GTM

GTM 과 연동을 위해서는 현재 운영중인 GTM ID 를 획득해야합니다

현재 프로젝트에 설정되어있는 GTM ID 값은 `GTM-TZKXKX7` 입니다

초기 설정 스크립트는 `index.html` 내 `<script>...</script>` 과 `<noscript>...</noscript>` 를 확인할 수 있습니다

이후, `src/plugins/gtm.js` 를 통해서 설정한 이벤트 및 데이터를 확인할 수 있습니다

구현한 스크립트는 각 내용에 맞춰 사용자의 액션에 맞춰 추가하고 수정할 수 있습니다

자세한 내용과 그 외 다른 이벤트 추적은 아래 공식문서에서 확인해볼 수 있습니다
(`https://developers.google.com/analytics/devguides/collection/ga4/reference/events?hl=en&client_type=gtag`)

### 상품조회 (`view_item`)

상품을 클릭할 시 상품의 정보를 추적되는 이벤트입니다

`src/views/Home.vue` 내부에서 상세화면으로 넘어갈 때 호출됩니다

### 체크아웃 (구매과정시작, `begin_checkout`)

특정 상품을 주문할 때 추적되는 이벤트입니다

`src/components/ProductDetailComponent.vue` 에서 특정 상태에 따른 조건으로 주문가능한 상태일 때 호출됩니다

### 구매완료 (`purchase`)

특정 상품을 주문 완료했을 때 추적되는 이벤트입니다

`src/views/OrderComplete.vue` 로 진입했을때 주문한 상품 정보와 함께 호출됩니다