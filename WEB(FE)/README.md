# BarberForce - Fronend

> `BarberForce` 프로젝트의 프론트엔드 부분을 위한 디렉토리

## Rules

- 컴포넌트 태그는 `CamelCase` 로 사용. (개인적으로 일반 컴포넌트와 비교할 때 2 word 이상의 `kebab-case` 로 구분하기보다는 `CamelCase`로 구분하는게 에디터에서도 다르게 하이라이팅이 되어서 더 가독성이 좋아보임)

## Notes

1. Nested Component
    - `components/folder1/folder2/Component.vue` 는 `Nuxt`의 `AutoImport`가 활성화 되어있을 때, `<Folder1Folder2Component>` 꼴로 사용해야 함.
    - 위 내용 때문에 `AutoImport`를 사용할거면 편의상 최대 1 Depth 까지만 폴더로 분류하기.
