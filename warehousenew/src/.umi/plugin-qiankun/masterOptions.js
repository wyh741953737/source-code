
      let options = {"masterHistoryType":"browser","base":"/","apps":[{"name":"login","entry":"//master.authoritycenter.web.cj.com/"},{"name":"componentCenter","entry":"//master.componentcenter.web.cj.com"}]};
      export const getMasterOptions = () => options;
      export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      