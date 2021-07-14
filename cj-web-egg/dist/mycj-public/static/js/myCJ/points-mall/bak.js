var list = [
      {
        id: 1,
        name: 'cart',
        title: '专车接送服务',
        toback: 'TRANSPORTATION',
        description: '我们会为您预约专业的司机，提供行程当日的接送服务，为您解决出行不便问题',
        variants: [
          {
            name: '接送次数',
            options: [
              {
                value: 'number1',
                name: '1次'
              },
              {
                value: 'number2',
                name: '2次'
              },
              {
                value: 'number3',
                name: '3次'
              },
              {
                value: 'number4',
                name: '4次'
              },
              {
                value: 'number5',
                name: '5次'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'hotel',
        title: '酒店住宿服务',
        description: '我们会根据您的选择，预定适合您的酒店，让您到达目的地即可入住，非常方便',
        toback: 'HOTELACCOMMODATION',
        variants: [
          {
            name: '星级',
            options: [
              {
                name: '一星级',
                value: 'type1'
              },
              {
                name: '二星级',
                value: 'type2'
              },
              {
                name: '三星级',
                value: 'type3'
              },
              {
                name: '四星级',
                value: 'type4'
              },
              {
                name: '五星级',
                value: 'type5'
              }
            ]
          },
          {
            name: '房间数',
            options: [
              {
                name: '一间',
                value: 'number1'
              },
              {
                name: '二间',
                value: 'number2'
              },
              {
                name: '三间',
                value: 'number3'
              },
              {
                name: '四间',
                value: 'number4'
              },
              {
                name: '五间',
                value: 'number5'
              }
            ]
          },
          {
            name: '天数',
            options: [
              {
                name: '一天',
                value: 'day1'
              },
              {
                name: '二天',
                value: 'day2'
              },
              {
                name: '三天',
                value: 'day3'
              },
              {
                name: '四天',
                value: 'day4'
              },
              {
                name: '五天',
                value: 'day5'
              }
            ]
          }
        ]
      }, 
      {
        id: 3,
        name: 'dinner',
        title: '午晚餐服务',
        description: '我们会根据您的选择，预定适合您口味的酒店，让您享受到当地城市的美味佳肴',
        toback: 'MEALS',
        variants: [
          {
            name: '数量',
            options: [
              {
                name: '一餐次',
                value: 'number1'
              },
              {
                name: '二餐次',
                value: 'number2'
              },
              {
                name: '三餐次',
                value: 'number3'
              },
              {
                name: '四餐次',
                value: 'number4'
              },
              {
                name: '五餐次',
                value: 'number5'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'translate',
        title: '专业翻译服务',
        description: '我们会根据您需要的翻译人员类型，安排专业的翻译人员，全程为您服务，解决异国沟通难问题',
        toback: 'PROFESSIONALTRANSLATION',
        variants: [
          {
            name: '翻译类型',
            options: [
              {
                name: '中英翻译',
                value: 'type1'
              },
              {
                name: '中俄翻译',
                value: 'type2'
              },
              {
                name: '中日翻译',
                value: 'type3'
              },
              {
                name: '中韩翻译',
                value: 'type4'
              },
              {
                name: '中德翻译',
                value: 'type5'
              }
            ]
          },
          {
            name: '翻译天数',
            options: [
              {
                name: '一天',
                value: 'number1'
              },
              {
                name: '二天',
                value: 'number2'
              },
              {
                name: '三天',
                value: 'number3'
              },
              {
                name: '四天',
                value: 'number4'
              },
              {
                name: '五天',
                value: 'number5'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'travel',
        title: '旅游服务',
        description: '我们会根据您的喜好，为您定制周边城市游玩服务，让您可在异国玩的尽兴',
        toback: 'TRAVEL',
        variants: [
          {
            name: '旅游人数',
            options: [
              {
                name: '1人',
                value: 'number1'
              },
              {
                name: '2人',
                value: 'number2'
              },
              {
                name: '3人',
                value: 'number3'
              },
              {
                name: '4人',
                value: 'number4'
              },
              {
                name: '5人',
                value: 'number5'
              }
            ]
          },
          {
            name: '旅游天数',
            options: [
              {
                name: '1天',
                value: 'number1'
              },
              {
                name: '2天',
                value: 'number2'
              },
              {
                name: '3天',
                value: 'number3'
              },
              {
                name: '4天',
                value: 'number4'
              },
              {
                name: '5天',
                value: 'number5'
              }
            ]
          }
        ]
      }
    ]