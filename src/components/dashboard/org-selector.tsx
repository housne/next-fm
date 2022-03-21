import type { Organization } from "@prisma/client";
import { ChangeEventHandler, FunctionComponent, useEffect, useState } from "react";
import { Select } from "../select";

type OrgSelectorProps = {
  onChange?: (value: number) => void
}

export const OrgSelector: FunctionComponent<OrgSelectorProps> = ({ onChange }) => {
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [selected, setSelected] = useState<number>()

  useEffect(() => {
    const fetchOrgs = async () => {
      const res = await fetch(`/api/org`)
      const orgs = await res.json()
      setOrgs(orgs)
      setSelected(orgs[0].id)
    }
    fetchOrgs()
  }, [])

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const select = e.target as HTMLSelectElement
    const value = +select.value
    setSelected(value)
    onChange && onChange(value)
  }

  return (
    <Select value={selected} label="组织" name="org_id" onChange={changeHandler}>
      {
        orgs.map(org => <option value={org.id} key={org.id}>{org.name}</option>)
      }
    </Select>
  )
}