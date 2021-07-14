import styles from "./index.less";

export function tipsFactory(module) {
  module.directive("tips", function () {
    return {
      template:
        '<div ng-transclude></div><div class="app-tips">{{text}}</div>',
      transclude: true,
      scope: {
        text: "@",
      },
      controller: [
        "$element",
        function ($element) {
          $element.addClass([styles.tipsComponent]);
        },
      ],
    };
  });
}
