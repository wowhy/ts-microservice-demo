import './App.css'

import * as React from 'react'
import { Admin, Resource } from 'react-admin'
import { createHashHistory } from 'history'

import { initDataProvider } from './providers/dataProvider'
import i18nProvider from './providers/i18nProvider'
import authProvider from './providers/authProvider'
import pagesProvider from './providers/pagesProvider'

import { Dashboard } from './pages/dashboard'

const history = createHashHistory()

interface IState {
  dataProvider: any
}

const Loading = (props: any) => (
  <div className="fullpage-loading">
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1" />
      <div className="sk-cube sk-cube2" />
      <div className="sk-cube sk-cube3" />
      <div className="sk-cube sk-cube4" />
      <div className="sk-cube sk-cube5" />
      <div className="sk-cube sk-cube6" />
      <div className="sk-cube sk-cube7" />
      <div className="sk-cube sk-cube8" />
      <div className="sk-cube sk-cube9" />
    </div>
  </div>
)

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      dataProvider: null
    }
  }

  public componentDidMount() {
    initDataProvider().then((dataProvider: any) => {
      this.setState({
        dataProvider
      })
    })
  }

  public render() {
    const { dataProvider } = this.state

    if (!dataProvider) {
      return <Loading />
    }

    return (
      <Admin
        title="Admin"
        locale="en"
        history={history}
        dashboard={Dashboard}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        authProvider={authProvider}
      >
        {pagesProvider.map((provider: any, i: number) => (
          <Resource key={i} {...provider} />
        ))}
      </Admin>
    )
  }
}

export default App
