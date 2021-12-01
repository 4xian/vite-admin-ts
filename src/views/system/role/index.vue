<script lang="tsx">
import { ref, unref, defineComponent, reactive, createVNode } from 'vue'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { getRoleList } from '@/api/system/role'
import { SystemType } from '#/system'
import { Table, Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import RoleForm from './form.vue'
import useModalConfig from '@/hooks/useModalConfig'
import { flatArray } from '@/utils/util'
import { menuTreeList, handlePermission } from '@/utils/auth'
import DetailItem from './detail.vue'
import SearchItem from './search.vue'
const KEY = 'roleId'
export default defineComponent({
  setup() {
    const formRef = ref<any>(null)
    const dataSource = ref<Partial<SystemType.RoleList>[]>([])
    const isEdit = ref(false)
    const formModal = useModalConfig()
    const detailModal = useModalConfig()
    const initValues = ref<Partial<SystemType.RoleList>>({})
    const formatTree = ref<SystemType.PermissionType[]>(flatArray(menuTreeList))
    const searchParams = reactive({ roleName: '' })
    const getList = () => {
      getRoleList(searchParams)
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
        title: '角色名',
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
              {handlePermission('角色编辑') && (
                <Button type='primary' onClick={() => Interface.edit(record)} style={{ marginRight: '10px' }}>
                  编辑
                </Button>
              )}
              {handlePermission('角色详情') && (
                <Button type='primary' onClick={() => Interface.detail(record)} style={{ marginRight: '10px' }}>
                  详情
                </Button>
              )}
              {handlePermission('角色删除') && (
                <Button danger onClick={() => Interface.delete(record.roleId)}>
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
      searchParams.roleName = v.roleName
      getList()
    }
    const searchReset = (v: any) => {
      v.resetFields()
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
        formModal.setTitle('新增角色')
        initValues.value = {}
        formModal.setVisible(true)
        isEdit.value = false
      }

      // 编辑
      static edit(v: SystemType.RoleList) {
        initValues.value = {
          ...v
        }
        isEdit.value = true
        formModal.setTitle('编辑角色')
        formModal.setVisible(true)
      }

      // 详情
      static detail(v: SystemType.RoleList) {
        initValues.value = {
          ...v
        }
        detailModal.setTitle('角色详情')
        detailModal.setVisible(true)
      }

      //   提交
      static submit() {
        console.log('submit')
        unref(formRef)
          .roleRef.validate()
          .then((res: Partial<SystemType.RoleList>) => {
            console.log(res)
            const tempAuth: string[] = []
            res.permission?.forEach((v) => {
              unref(formatTree).forEach((t) => {
                if (v === t.key) {
                  tempAuth.push(t.title)
                }
              })
            })
            console.log(tempAuth)
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
