<script lang="tsx">
import { ref, unref, defineComponent } from 'vue'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { getRoleList } from '@/api/system/role'
import { SystemType } from '#/system'
import { Table, Button, Tree, Modal } from 'ant-design-vue'
import RoleForm from './form.vue'
import useModalConfig from '@/hooks/useModalConfig'
const KEY = 'roleId'
export default defineComponent({
  setup() {
    const formRef = ref<any>(null)
    const dataSource = ref<Partial<SystemType.RoleList>[]>([])
    const isEdit = ref(false)
    const formModal = useModalConfig()
    const initValues = ref<Partial<SystemType.RoleList>>({})
    const getList = () => {
      getRoleList()
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
              <Button type='primary' onClick={() => Interface.edit(record)} style={{ marginRight: '10px' }}>
                编辑
              </Button>
              <Button type='primary' style={{ marginRight: '10px' }}>
                详情
              </Button>
              <Button danger>删除</Button>
            </>
          )
        }
      }
    ]
    const submit = () => {
      console.log('submit')
      unref(formRef)
        .validate()
        .then((res: any) => {
          console.log(res)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
    const cancel = () => {
      formModal.setVisible(false)
      initValues.value = {}
    }

    // 操作
    class Interface {
      // 编辑
      static edit(v: SystemType.RoleList) {
        initValues.value = {
          ...v
        }
        isEdit.value = true
        console.log('edit')
        formModal.setVisible(true)
      }
    }

    const FormModal = (): JSX.Element => {
      return (
        <Modal
          width={800}
          title={unref(formModal.title)}
          visible={unref(formModal.visible)}
          onOk={submit}
          onCancel={cancel}
          destroyOnClose
          okText='确认'
          cancelText='取消'
        >
          <RoleForm ref={formRef} initValues={unref(initValues)} isEdit={unref(isEdit)}></RoleForm>
        </Modal>
      )
    }
    return () => {
      return (
        <div>
          <Table columns={columns} rowKey={KEY} dataSource={unref(dataSource)} size='small' bordered></Table>
          {FormModal()}
        </div>
      )
    }
  }
})
</script>
<style lang="scss" scoped></style>
