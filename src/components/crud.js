import React,{Component} from 'react'
import axios from 'axios'
class Crud extends Component{

    constructor(){
    super();
    this.state={
        id:'',
        name:'',
        department:'',
        students:[],
    }


}
componentDidMount() {
       this.getAllRecords();
    }

    onChangeHandler=(event)=>{
        this.setState({
           [event.target.name] : event.target.value
        } )
    }

formSubmit=()=>{
        let tempStudents=this.state.students;
        let student={
            id:this.state.id,
            name:this.state.name,
            department:this.state.department
        }
         axios.post('http://localhost:8080/student/create',student).then(response=>{
            this.getAllRecords();

        }).catch(error=>{

        })

}
edit(i){
        this.setState({
            id:this.state.students[i].id,
            name:this.state.students[i].name,
            department:this.state.students[i].department,

        })
}
delete=(e)=>{
    axios.get('http://localhost:8080/student/delete/'+e)
        .then(response=>{
            console.log(response)
            this.getAllRecords();
        }).catch(error=>{
        console.log(error)
    })
}
    render() {
        console.log("Render method!!!")
        return (
          <React.Fragment>
              <table>
                  <tr>
                      <th> <label>Name  :</label></th>
                      <th><input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} /></th>
                  </tr>
                  <tr>
                      <th> <label>Department:</label></th>
                      <th><input value={this.state.department} name="department" type="text" onChange={this.onChangeHandler} /></th>
                  </tr>
                    <tr>

                    </tr>
                  <tr><th></th><th><button onClick={this.formSubmit}>Submit</button></th></tr>
                  <tr>
                      <br/>


                  </tr>
              </table>
              <div>
                  {this.state.students.map((student,i)=>(
                      <div  key={i}>{i+1}  {student.name} {student.department} <button onClick={()=>this.edit(i)}>Edit</button> <button onClick={()=>this.delete(student.id)}>Delete</button></div>

                  ))}

              </div>

          </React.Fragment>
        );
    }

    getAllRecords=()=>{
        axios.get('http://localhost:8080/student/getAll')
            .then(response=>{
                console.log(response)
                this.setState({
                    students:response.data,
                    id:'',
                    name:'',
                    department:''
                })
            }).catch(error=>{
            console.log(error)
        })
    }
}
export default Crud
