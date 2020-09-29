<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="myForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" :prop="type">
                <el-input :type="leixing" v-model="ruleForm[type]" :maxlength="leng"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="validateEmail('myForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('localization.Reset')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:{
        leixing:{
            type:String,
            default:'text'
        },
        type:{
            type:String,
            default:'name'
        }
    },
    data(){
        var checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            if (value) {
                setTimeout(() => {
                    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入有效的电子邮箱！'));
                    } else {
                        callback();
                    }
                }, 500);
            }
        };
        var checkPhone = (rule,value,callback) =>{
            if(!value){
                return callback(new Error('手机号码不能为空'));
            }
            if(value){
                setTimeout(() => {
                    var pattern = /^1[34578]\d{9}$/;
                    if(!pattern.test(value)){
                        callback(new Error('请输入有效的手机号码'))
                    }else{
                        callback();
                    }
                }, 500);
            }
        }
        var checkAge = (rule,value,callback) =>{
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 18) {
                callback(new Error('必须年满18岁'));
                } else {
                callback();
                }
            }
            }, 1000);
        }
        var checkText = (rule,value,callback) => {
            if(!value){
                return callback(new Error('内容不能为空'))
            }
            setTimeout(() => {
                let val = value.split(',')
                if(val.length==16){
                    this.leng = val.length
                    return
                }
            },500)
        }
        return{
            ruleForm:{},
            leng:'',
            rules:{
                name:[
                    {
                        required:true,message:'请输入商品分类',trigger:'blur'
                    }
                ],
                email:[
                    {
                        required:true,validator:checkEmail,trigger:['blur','change']
                    }
                ],
                age:[
                    { required: true, validator:checkAge,trigger:'blur'},
                ],
                phone:[
                    { required: true, validator:checkPhone,trigger:['blur','input']},
                ],
                card:[
                    {required:true,validator:checkText,trigger:['blur','change']}
                ]
            },
        }
    },
    watch:{
        type(){
            ruleForm[this.type] = ''
        }
    },
    methods:{
        validateEmail(formName){
            let b = this.$refs[formName].validateField(this.type,(valid)=>{
                if(!valid){
                }else{
                    return false
                }
            })
        },
    }
}
</script>