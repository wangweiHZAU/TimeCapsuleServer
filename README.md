# 作业思路和问题
## 思路
将localStorage转化为后台储存

## 问题
在修改ts文件时，生成的js文件总是自动加上`export {}`导致浏览器报错。添加
`type='module'`之后，不自动生成export但是也导致了html无法调用脚本内的函数。