# WorkSpace

## 5.23

+ django 개발 환경 세팅

## 5.24

+ templates 설정 및 hello world 찍기
+ input 추가하기

## 5.28

+ model 추가하기

## 5.29

+ 키워드 validation 및 update
+ 화면에 키워드 찍기

## 5.30

+ UI 개선

## 5.31

+ WebSocket 활용 keyword 실시간 반영 구현

## 6.1

+ Socket message 받아서 keyword push하기
+ index view post method로 변경하기
+ app.js onload

## 6.3

+ document keywords에 jwt를 담게 변경

## 6.4

+ form 데이터 변경을 submit()시에만 하기
+ submit 시 update 로직을 api를 fetch해서 처리하기
+ list data 대신 jwt를 json으로 변환하여 context로 전달

## 6.5

+ frontend api request 파트 분할, Keyword, Content schema 생성 및 document_keyword API 추가

## 6.6

+ models에 Keyword 추가하기. Document title 컬럼 추가
+ rest-framework 적용하여 API refactoring

## 6.7

+ js 구조 리팩토링 하기
+ keyword 클릭시 keywordId 찍기

## 6.8

+ keyword componenet 분리
+ 새 키워드 추가 시 클릭하면 redirect되는 버그 고치기
+ JsonResponse를 rest-framework Response로 수정하기

## 6.9

+ class view 적용, mixin, exception 파트 view 로직에서 분리
+ Response custom하기
+ ComponentView 추가 및, 상속하여 component 구조화
+ KeywordDetail update API 추가

## 6.10

+ ComponentView 추가 및, 상속하여 component 구조화
+ Component 리팩토링 하기, setId, setClass method 추가하기
+ document -> note로 이름 변경
+ socket 파일 정리하기

## 6.11

feat: Structure, Component 구조 변경, Structure.child 메소드 변경

> Component와 ComponentView가 변수명 작성시 완벽하게 구분이 안되는 문제가 있었음
> Component -> Structure, ComponentView -> Component로 class명을 수정하였음
> Structure 여러개를 한번에 rendering 할 때 index.js에서 하나의 structure로 관리하는 것에 대한 문제점이 있었음. 이 문제를 Structure.child 메소드에서 배열로 structure 인자를 받아서 해결함.

feat: child 부분 single Structure도 허용하게 수정

+ onState 파트 구현 && parent 인자에 undefined|Structure만 허용하는 로직 구현

## 해야할 것

+ delete 및 키워드 상세 조회하기, update
+ get keyword api 없이 프론트 단에서 키워드 detail 조회하는 방법 적용해보기
+ keyword detail component 그리기

// backup
