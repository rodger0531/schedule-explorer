import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const mockAxios = new MockAdapter(axios);

mockAxios
  .onGet('/tutor/schedule').reply(config => {
    const startOfWeek = dayjs().startOf('week')
    const endOfWeek = dayjs().endOf('week')
    let MockCalendarData;
    // Current Week mock data
    if(dayjs(config.params.startDate).isBetween(startOfWeek, endOfWeek, null, '[]')){
      MockCalendarData = {
        "available":[
          {
            "start":"2021-05-21T10:30:00Z",
            "end":"2021-05-21T11:00:00Z"
          },
          {
            "start":"2021-05-21T13:00:00Z",
            "end":"2021-05-21T14:00:00Z"
          },
          {
            "start":"2021-05-22T05:30:00Z",
            "end":"2021-05-22T07:00:00Z"
          }
        ],
        "booked":[
          {
            "start":"2021-05-16T10:30:00Z",
            "end":"2021-05-16T11:00:00Z"
          },
          {
            "start":"2021-05-21T11:00:00Z",
            "end":"2021-05-21T13:00:00Z"
          },
          {
            "start":"2021-05-21T14:00:00Z",
            "end":"2021-05-21T15:00:00Z"
          },
          {
            "start":"2021-05-22T07:00:00Z",
            "end":"2021-05-22T08:00:00Z"
          },
          {
            "start":"2021-05-22T11:30:00Z",
            "end":"2021-05-22T13:00:00Z"
          }
        ]
      }
    } else if (dayjs(config.params.startDate).isBetween(startOfWeek.add(7,'days'), endOfWeek.add(7, 'days'), null, '[]')){
      // Next week mock data
      MockCalendarData = {
        "available":[
          {
            "start":"2021-05-24T05:30:00Z",
            "end":"2021-05-24T07:00:00Z"
          },
          {
            "start":"2021-05-24T13:00:00Z",
            "end":"2021-05-24T14:00:00Z"
          }
        ],
        "booked":[
          {
            "start":"2021-05-24T10:30:00Z",
            "end":"2021-05-24T11:00:00Z"
          }
        ]
      }
    } else {
      MockCalendarData = {
        "available":[],
        "booked":[]
      }
    }
    // if(dayjs(config.params.startDate))
    return [200, MockCalendarData]
  })
  .onAny().passThrough();