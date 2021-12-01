<script lang="tsx">
import { ref, unref, defineComponent, reactive, createVNode } from 'vue'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { getUserList } from '@/api/system/user'
import { SystemType } from '#/system'
import { Table, Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import RoleForm from './form.vue'
import useModalConfig from '@/hooks/useModalConfig'
import DetailItem from './detail.vue'
import SearchItem from './search.vue'
import { handlePermission } from '@/utils/auth'
const KEY = 'userId'
export default defineComponent({
  setup() {
    const formRef = ref<any>(null)
    const dataSource = ref<Partial<SystemType.UserList>[]>([])
    const isEdit = ref(false)
    const formModal = useModalConfig()
    const detailModal = useModalConfig()
    const initValues = ref<Partial<SystemType.UserList>>({})
    const searchParams = reactive({ userName: '', roleName: '' })
    const getList = () => {
      getUserList(searchParams)
        .then((res) => {
          dataSource.value = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getList()

    const columns: ColumnProps[] = [
      {
        title: '用户名',
        align: 'center',
        dataIndex: 'userName'
      },
      {
        title: '所属角色',
        align: 'center',
        dataIndex: 'roleName'
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime'
      },
      {
        title: '修改时间',
        align: 'center',
        dataIndex: 'updateTime'
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'action',
        customRender: ({ record }) => {
          return (
            <>
              {handlePermission('用户编辑') && (
                <Button type='primary' onClick={() => Interface.edit(record)} style={{ marginRight: '10px' }}>
                  编辑
                </Button>
              )}
              {handlePermission('用户详情') && (
                <Button type='primary' onClick={() => Interface.detail(record)} style={{ marginRight: '10px' }}>
                  详情
                </Button>
              )}
              {handlePermission('用户删除') && (
                <Button danger onClick={() => Interface.delete(record.userId)}>
                  删除
                </Button>
              )}
            </>
          )
        }
      }
    ]
    const cancel = () => {
      formModal.setVisible(false)
      initValues.value = {}
    }

    const handleSearch = (v: any) => {
      console.log(v)
      searchParams.userName = v.name
      searchParams.roleName = v.role
      getList()
    }
    const searchReset = (v: any) => {
      v.resetFields()
      searchParams.userName = ''
      searchParams.roleName = ''
      getList()
    }

    // 分页配置
    const pagesConfig = {
      defaultPageSize: 5,
      onChange(page: number, pageSize: number) {
        console.log(page, pageSize)
      }
    }

    // 接口操作
    class Interface {
      // 新增
      static add() {
        formModal.setTitle('新增用户')
        initValues.value = {
          roleName: '超级管理员'
        }
        formModal.setVisible(true)
        isEdit.value = false
      }

      // 编辑
      static edit(v: SystemType.UserList) {
        initValues.value = {
          ...v
        }
        isEdit.value = true
        formModal.setTitle('编辑用户')
        formModal.setVisible(true)
      }

      // 详情
      static detail(v: SystemType.UserList) {
        initValues.value = {
          ...v
        }
        detailModal.setTitle('用户详情')
        detailModal.setVisible(true)
      }

      //   提交
      static submit() {
        console.log('submit')
        unref(formRef)
          .userRef.validate()
          .then((res: Partial<SystemType.UserList>) => {
            console.log(res)
          })
          .catch((err: any) => {
            console.log(err)
          })
      }

      //   删除
      static delete(v: number) {
        console.log(v)
        Modal.confirm({
          title: '确认删除该条数据吗?',
          icon: createVNode(ExclamationCircleOutlined),
          okText: '确定',
          cancelText: '取消',
          maskClosable: true,
          onOk: async () => {
            console.log('删除')
          }
        })
      }
    }

    const DetailModal = (): JSX.Element => {
      return (
        <Modal
          width={800}
          title={unref(detailModal.title)}
          footer={null}
          visible={unref(detailModal.visible)}
          destroyOnClose
          onCancel={() => detailModal.setVisible(false)}
        >
          <DetailItem detail={unref(initValues)} />
        </Modal>
      )
    }

    const FormModal = (): JSX.Element => {
      return (
        <Modal
          width={800}
          title={unref(formModal.title)}
          visible={unref(formModal.visible)}
          onOk={Interface.submit}
          onCancel={cancel}
          destroyOnClose
          okText='确认'
          cancelText='取消'
        >
          <RoleForm ref={formRef} initValues={unref(initValues)} isEdit={unref(isEdit)}></RoleForm>
        </Modal>
      )
    }
    return () => (
      <div>
        <SearchItem add={Interface.add} search={handleSearch} reset={searchReset} />
        <Table columns={columns} rowKey={KEY} dataSource={unref(dataSource)} bordered pagination={pagesConfig}></Table>
        {FormModal()}
        {DetailModal()}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped></style>
