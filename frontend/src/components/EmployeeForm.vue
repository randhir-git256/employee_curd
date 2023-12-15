<template>
  <div>
    <h2>Employee Form</h2>
    <form @submit.prevent="save">
      <div class="row mb-3">
      <label for="name" class="col-sm-2 col-form-label">Name:</label>
      <div class="col-sm-10">
        <input type="text" id="name" v-model="employee.name" class="form-control" placeholder="Employee name" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="gender" class="col-sm-2 col-form-label">Gender:</label>
      <div class="col-sm-10">
        <input type="text" id="gender" v-model="employee.gender" class="form-control" placeholder="Gender" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="email" class="col-sm-2 col-form-label">Email:</label>
      <div class="col-sm-10">
        <input type="email" id="email" v-model="employee.email" class="form-control" placeholder="Email" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="contactNumber" class="col-sm-2 col-form-label">Contact Number:</label>
      <div class="col-sm-10">
        <input type="text" id="contactNumber" v-model="employee.contactNumber" class="form-control" placeholder="Contact Number" required>
      </div>
    </div>

    <div class="row mb-3">
      <label for="address" class="col-sm-2 col-form-label">Address:</label>
      <div class="col-sm-10">
        <textarea id="address" v-model="employee.address" class="form-control" placeholder="Address" required></textarea>
      </div>
    </div>

    <div class="row mb-3">
      <label for="designation" class="col-sm-2 col-form-label">Designation:</label>
      <div class="col-sm-10">
        <input type="text" id="designation" v-model="employee.designation" class="form-control" placeholder="Designation" required>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
    
    </form>
  

    <h2>Employee View</h2>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Email-ID</th>
          <th scope="col">Contact Number</th>
          <th scope="col">Address</th>
          <th scope="col">Designation</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in result" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.contactNumber }}</td>
          <td>{{ employee.address }}</td>
          <td>{{ employee.designation }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="edit(employee)">Edit</button>
            <button type="button" class="btn btn-danger" @click="remove(employee)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmployeeCrud',
  data() {
    return {
      result: [],
      employee: {
        id: '',
        name: '',
        gender: '',
        email: '',
        contactNumber: '',
        address: '',
        designation: '',
      },
    };
  },
  created() {
    this.employeeLoad();
  },
  methods: {
    async employeeLoad() {
      try {
        const response = await axios.get('http://localhost:8000/user/getAll');
        this.result = response.data.data;
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    },
    async save() {
      if (!this.employee.id) {
        await this.saveData();
      } else {
        await this.updateData();
      }
    },
    async saveData() {
      try {
        await axios.post('http://localhost:8000/user/create', this.employee);
        alert('Employee saved successfully!');
        this.employeeLoad();
        this.clearForm();
      } catch (error) {
        console.error('Error saving employee:', error);
      }
    },
    edit(employee) {
      this.employee = { ...employee };
    },
    async updateData() {
      try {
        await axios.patch(`http://localhost:8000/user/update/${this.employee.id}`, this.employee);
        alert('Employee updated successfully!');
        this.employeeLoad();
        this.clearForm();
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async remove(employee) {
      try {
        await axios.delete(`http://localhost:8000/user/delete/${employee.id}`);
        alert('Employee deleted successfully!');
        this.employeeLoad();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
    clearForm() {
      this.employee = {
        id: '',
        name: '',
        gender: '',
        email: '',
        contactNumber: '',
        address: '',
        designation: '',
      };
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
