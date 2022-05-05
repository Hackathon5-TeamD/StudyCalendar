/* eslint-disable */
import { AxiosInstance } from 'axios'
import mockServer from 'axios-mock-server'
import mock0 from './users/register'
import mock1 from './users/me'
import mock2 from './users/login'
import mock3 from './users/list'
import mock4 from './calendar/month'
import mock5 from './calendar/day'

export default (client?: AxiosInstance) => mockServer([
  {
    path: '/users/register',
    methods: mock0
  },
  {
    path: '/users/me',
    methods: mock1
  },
  {
    path: '/users/login',
    methods: mock2
  },
  {
    path: '/users/list',
    methods: mock3
  },
  {
    path: '/calendar/month',
    methods: mock4
  },
  {
    path: '/calendar/day',
    methods: mock5
  }
], client, '')
