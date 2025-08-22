import axios from '@/lib/axios.js'


export async function getLoanProduct(pageParams) {
  try {
    const {data} = await axios.get('/loan_product/get-all', {
      params: {
        page: pageParams.page,
        size: pageParams.size,
        name: pageParams.name,
      },
    })

    return data
  } catch (error) {
    return error
  }
}

export async function deleteLoanProduct(id) {
  try {
    return await axios.delete(`/loan_product/delete/${id}`, {})
  } catch (error) {
    return error
  }
}

export async function addLoanProduct(formData) {
  try {
    return await axios.post('/loan_product/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    return error
  }
}

export async function updateLoanProduct(id, newData) {
  try {
    return await axios.put('/loan_product/update/', newData, {
      params: {
        prodcut_id: id,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    return error
  }
}

export async function downloadFile(file_url) {
  try {
    const {data} = await axios.get('/loan_product/v1/get/file/', {
      params: {
        file_path: file_url,
      },
      responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([data]))
    const linkElement = document.createElement('a')

    linkElement.href = url
    linkElement.setAttribute('download', `${file_url}`)

    document.body.appendChild(linkElement)

    linkElement.click()

    return new File([data], 'name')
  } catch (error) {
    return error
  }
}
