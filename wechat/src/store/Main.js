import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'

class Main extends BaseActions {


  @action
  async getUnionInfo() {
    return await this.post(urls.API_UNION_INFO_LOAD, null)
  }

  @action
  async getProject() {
    return await this.post(urls.API_PROJECT_LOAD, null)
  }

  @action
  async getAct() {
    return await this.post(urls.API_ACT_LOAD, null)
  }

  @action
  async getQues() {
    return await this.post(urls.API_QUES_LOAD, null)
  }
  
  @action
  async saveMsg(params) {
    return await this.post(urls.API_MSG_SAVE, params)
  }
  

}

 



export default new Main()
