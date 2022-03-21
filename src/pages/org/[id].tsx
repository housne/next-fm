import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { RadioCardListComponent } from '../../components/radio-card-list'
import { RadioListWithPagination } from '../../components/radio-list-with-pagination'
import { NOT_FOUND } from '../../constants'
import { getOrgById, listAllOrg, listRadios } from '../../lib/api'
import type { Organization, Radio } from '../../types/radio'

type OrganizationPageProps = {
  org?: Organization
  radios?: Radio[]
  featuredRadios?: Radio[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const orgs = await listAllOrg()
  return {
    paths: orgs.map(g => ({params: {id: g.id.toString()}})),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<OrganizationPageProps> = async ({params}) => {
  if (!params || typeof params.id !== 'string') {
    return NOT_FOUND
  }
  const id = + params.id
  const org = await getOrgById(id)
  if (!org) {
    return NOT_FOUND
  }
  return {
    props: {
      org,
      radios: await listRadios({org: {id}}),
      featuredRadios: await listRadios({org: {id}, is_featured: true})
    }
  }
}

const OrganizationPage: NextPage<OrganizationPageProps> = ({ featuredRadios, radios, org }) => {
  if (!org || !featuredRadios || !radios) {
    return null
  }
  return (
    <div className="px-12 py-4">
      <Head>
        <title>{org.name}</title>
      </Head>
      <h1 className="text-3xl border-b py-4">{org.name}</h1>
      {
        featuredRadios.length > 0 && (
          <div className="border-b mt-4">
            <RadioCardListComponent radios={featuredRadios} isFeatured />
          </div>
        )
      }
      <div className="mt-4">
        <RadioListWithPagination radios={radios} type="org" id={org.id} />
      </div>
    </div>
  )
}

export default OrganizationPage