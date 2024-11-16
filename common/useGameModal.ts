// composables/useModal.ts
import { ref } from 'vue';

const isModalOpen = ref(false);
const modalContent = ref<any>(null);

export const useGameModal = () => {

    const openGameModal = (content: any) => {
        modalContent.value = content;
        isModalOpen.value = true;
    };

    const closeGameModal = () => {
        modalContent.value = null;
        isModalOpen.value = false;
    };

    return {
        isModalOpen,
        modalContent,
        openGameModal,
        closeGameModal,
    };
};
