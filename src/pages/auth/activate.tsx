import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { http } from "../../lib/http";

type ActivateStatus = 'not_started' | 'activating' | 'fail' | 'success'

const UserActivatePage: NextPage = () => {
  const { query } = useRouter()
  const { code } = query
  const [status, setStatus] = useState<ActivateStatus>('not_started')

  useEffect(() => {
    if (!code || typeof code !== 'string') {
      return
    }
    setStatus('activating')
    http.get('/auth/activate', {query: {code}})
      .then(() => setStatus('success'))
      .catch(() => setStatus('fail'))
  }, [code])

  if (!code || typeof code !== 'string') {
    return null
  }

  const getText = () => {
    if (status === 'not_started' || status === 'activating') {
      return '正在激活用户'
    } else if (status === 'success') {
      return '用户激活成功'
    } else if (status === 'fail') {
      return '用户激活失败，请确认用户是否已激活，或者激活链接是否正确'
    }
  }
  
  return (
    <div className="px-12 py-12">
      { getText() }
    </div>
  )
}

export default UserActivatePage