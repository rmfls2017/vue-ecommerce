import {createApp, defineComponent} from "vue";
export const changePage = {
    install(app) {
        app.config.globalProperties.$changePage = async function(directory, componentName, params = {}) {
            try {
                // 동적으로 컴포넌트 import
                const component = await import(`@/components/${directory}/${componentName}.vue`);

                // 현재 컴포넌트 상태 저장
                const currentState = {
                    directory,
                    component: componentName,
                    params
                };

                // defineComponent를 사용하여 컴포넌트 정의
                const newComponent = defineComponent(component.default);

                // 현재 컴포넌트를 새로운 컴포넌트로 대체
                const mountElement = this.$el;
                const newVm = createApp(newComponent, params);
                newVm.mount(mountElement);

                // 현재 페이지 상태 업데이트
                app.config.globalProperties.$currentPage = currentState;

                return newVm;
            } catch (error) {
                console.error(`컴포넌트 로드 실패: ${directory}/${componentName}`, error);
                return null;
            }
        }
    }
}