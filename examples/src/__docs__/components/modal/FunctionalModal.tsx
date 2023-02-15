import { useState } from './composition-api'

export default function FunctionalModal(_: any, context: any) {
  const [str, setStr] = useState('')
  return (
    <y-modal title="function modal" {...context.attrs}>
      <h1>Hello here is Functional Modal</h1>
      <h2>{str.value}</h2>
      <y-input
        modelValue={str.value}
        onUpdate:modelValue={(val: string) => setStr(val)}
      />
    </y-modal>
  )
}
