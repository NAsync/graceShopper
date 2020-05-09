import React, {Component} from 'react'
import {connect} from 'react-redux'

const nonEditableFields = ['brandId', 'createdAt', 'id', 'reviews', 'updatedAt']

class AdminProductSingle extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const {product} = this.props
    const entries = Object.entries(product)
    const displayEntries = []
    entries.forEach(entry => {
      let [k, v] = entry
      if (k === 'brand') {
        displayEntries.push([k, v.name])
        } else if (k === 'reviews' || k === 'brandId') {
      } else {
        displayEntries.push([k, v])
      }
    })
    return (
      <div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {displayEntries.map((entry, idx) => {
              let [k, v] = entry
              return (
                <tr
                  key={idx}
                  className={
                    nonEditableFields.includes(k)
                      ? 'admin-non-edit'
                      : 'admin-edit'
                  }
                >
                  <td>{`${k}`}</td>
                  <td>{`${v}`}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button>Submit</button>
      </div>
    )
  }
}

{
  /* <select onChange={ ev => update(id, ev.target.value)} >
    <option key='null' value='null'>-- Add Student --</option>
    {notSchoolStudents.map( student => {
        return (
            <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
            </option>
        )
    })}
</select> */
}

const mapStateToProps = ({product}) => {
  return {
    product
  }
}

export default connect(mapStateToProps)(AdminProductSingle)
