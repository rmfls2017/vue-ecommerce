# CHANGELOG

## History

### 2025-04-02 (v1.0.1)

* 누락된 스크립트 추가
    * Ship (배송대행)

* 각 이벤트 별 PageView 이벤트 발생 시 title, path, location 설정

* Sell 이벤트 추적 데이터 내 상품명 (`ecommerce.items[].item_name`) prefix 제거 (ex. `[사줘요] 상품A` => `상품A`)


### 2025-03-27 (v1.0.0)

* GA 소스/매체 추적이 필요한 이벤트마다 필요한 스크립트 생성
    * Signup (회원가입)
    * Ship (배송대행)
    * Sell (팔아요-구매완료)
    * Buy (사줘요-구매완료)
    * Wanted (사줘요)
    * Upload (팔아요)