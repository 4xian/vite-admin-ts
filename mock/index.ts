import userModules from './modules/user'
import { rolesList, userList } from './modules/system'

export default [...userModules, ...rolesList, ...userList]
