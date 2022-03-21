import { NextPage } from "next";
import { FormEventHandler } from "react";
import { Input } from "../../../components/input";

const CreateOrgPage: NextPage = () => {

  const createOrg: FormEventHandler = async e => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    if (!name || !name.trim()) {
      return
    }
    const res = await fetch(`/api/org`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
    })
    const json = await res.json()
    console.log(json)
  }

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">创建组织</h1>
      <form onSubmit={createOrg} className="w-[640px] mt-6">
        <Input label="名称" name="name" />
        <button className="px-6 py-1.5 bg-red-500 text-white rounded-md" type="submit">创建</button>
      </form>
    </div>
  )
}

export default CreateOrgPage