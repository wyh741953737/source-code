import { dynamic } from 'umi';

export default function(Comp: Function) {
  return dynamic({
    loader: async () => {
      return Comp;
    },
  });
}
