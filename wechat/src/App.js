import React,{ Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard  from 'component/Dashboard'
// import { Socket } from 'react-socket-io';

// const uri = 'http://localhost/';
// const options = { transports: ['websocket'] };


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' render={() => (
            <div className='app-root'>
              <Dashboard>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route exact path='/intr'  component={lazy(() => import('app/intr'))}/>
                    <Route exact path='/proj'  component={lazy(() => import('app/proj'))}/>
                    <Route exact path='/cont'  component={lazy(() => import('app/cont'))}/>
                    
                    <Route exact path='/acty'  component={lazy(() => import('app/acty'))}/>
                    <Route exact path='/hist'  component={lazy(() => import('app/hist'))}/>

                    <Route exact path='/ques'  component={lazy(() => import('app/ques'))}/>
                    <Route exact path='/chat'  component={lazy(() => import('app/chat'))}/>
                    <Route exact path='/msg'   component={lazy(() => import('app/msg'))}/>

                    <Route exact path='/chats'  component={lazy(() => import('app/chats'))}/>

                    <Route exact path='/sys'  component={lazy(() => import('app/sys'))}/>

                  </Switch>
                </Suspense>
              </Dashboard>
            </div>
           )} />
        </Switch>
      </Router>
    )
  }
}

export default App;
