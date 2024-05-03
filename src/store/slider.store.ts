import { create } from "zustand";

type Slider = {
  navSlider: boolean;
  taskSlider: boolean;
  actions: {
    navSliderSet: (action: boolean) => void;
    taskSliderSet: (action: boolean) => void;
  };
};

const useStore = create<Slider>()((set) => ({
  navSlider: false,

  taskSlider: false,

  actions: {
    navSliderSet(action) {
      set({ navSlider: action });
    },

    taskSliderSet(action) {
      set({ taskSlider: action });
    },
  },
}));

const useNavSlider = () => useStore((state) => state.navSlider);
const useTaskSlider = () => useStore((state) => state.taskSlider);
const useSliderActions = () => useStore((state) => state.actions);

export { useNavSlider, useTaskSlider, useSliderActions };
