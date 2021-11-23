export interface RouterItem {
  path: string
  name: string
  component: any
  meta: Partial<MetaType>
  auth: string
  nested: boolean
  redirect: string
  children: Partial<RouterItem>[]
}

interface MetaType {
  title: string
  icon: string
}
