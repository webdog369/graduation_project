# graduation_project

---

***来自webdog369的本科毕业设计***

----

### ☞系统测试结果

***1.1 系统测试用例***

在本系统中，我们将对在前几章中提到的大部分内容进行功能测试，还会在测试之后给出效果图，具体测试项目如下：

(1)注册功能。

(2)登录功能。

(3)视频发布功能。

(4)视频浏览功能。

(5)视频点赞收藏功能。

(6)视频评论功能。

(7)修改个人资料功能。

(8)查看个人作品及收藏作品功能。

 

***1.2 系统运行结果及说明***

注册功能测试如图1.1所示：

![msg](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps1.jpg?raw=true)



图1.1 注册界面

 

用户需要在注册界面输入自己想要的账户名称，账户名称没有限制，但不能输入空格，密码长度不得小于六位数，这样就保障了密码的安全性能。若用户输入的用户名在数据库中已存在，则会提示“该用户名已被注册，请重新输入”字样。

当用户注册成功后，用户的信息将会被存储到数据库中，我们通过postman软件查询到的用户信息如图5.2所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps2.jpg?raw=true) 

图1.2 数据库中的用户信息

 

当用户注册成功后，界面会提示“欢迎某某某注册成功”下方有个按钮为“去登录”，点击该按钮后就会跳转到登录界面，由于登录界面和注册界面的结果基本一致，所以为了让用户区分二者的区别之处，我们将两个页面的背景图片设置成了不一样的，以便用户区分，具体效果如图5.3所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps3.jpg?raw=true) 

 

图1.3 登录界面展示

 

在用户点击登录按钮后，系统会将用户填写的数据提交到服务器中，然后通过比对userName确定用户是否存在，这里调用的是findone方法，若查询到用户数据，则会获取已查询到的用户的password是否与用户输入的相同，若正确则登录成功，用户不存在则会发送一个状态码，表示用户名不存在，此时也就不用再进行密码验证了，系统会将表单进行清空。若密码错误，也会发送一个状态码表示用户输错了密码，此时只会清空用户的密码而不会清空用户的用户名。用户只需输入正确的密码即可登录成功。

用户在登录成功后会调整转到首页，若首页有作品则如图5.4所示：

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps4.jpg?raw=true) 

 

图1.4主页展示

用户在评论效果如图1.5所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps5.jpg?raw=true) 

 

图1.5 评论发布后的效果

 

用户在评论在数据库中的格式如图1.6所示：

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps6.jpg?raw=true) 

 

图1.6 数据库中的评论信息

 

用户个人中心效果如图1.7所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps7.jpg?raw=true) 

 

图1.7 个人中心展示

 

注：这个主页中显示的信息是用户未设置头像、未设置个人简介、未设置个人标签、未发布作品、未收藏作品的界面。

用户在修改个人信息界面效果如图1.8所示：

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps8.jpg?raw=true) 

 

图1.8 编辑个人信息

 

用户点击更换头像按钮时弹出的相册效果如图1.9所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps9.jpg?raw=true) 

图1.9 从本地选择头像

 

在用户点击完头像后会弹出此界面从本地选择图片作为头像。

用户在填写完个人信息后效果如图1.10所示：

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps10.jpg?raw=true) 

 

图1.10 填写完资料

 

用户修改完资料后去个人中心展示的效果图如1.11所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps11.jpg?raw=true) 

 

图1.11 修改资料后的效果

 

用户更新后的信息在数据库中的表现如图1.12所示：

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps12.jpg?raw=true) 

图1.12 数据库中用户更新完的资料

 

用户在填写完信息后，若设置了userTag，并且设置的时候使用英文逗号隔开了标签，服务器会使用split方法将字符串分割成数组存储在userTag中。

用户发布页面效果如图1.13所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps13.jpg?raw=true) 

 

图1.13 发布作品页面

 

该页面需要点击上方虚线框，点击后会弹出本地文件夹，用户只需在文件夹中选择视频文件即可，在选择文件后会自动截取第一帧作为封面显示到虚线框中。

用户在填写完即将发布的作品数据时后，若视频地址和视频标题等两个重要信息都存在，则发布按钮就会被激活，若少了其中一个信息，发布按钮就是未激活的灰色状态。具体效果如图5.14所示：

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps14.jpg?raw=true) 

 

图1.14 填写完作品信息界面

 

用户作品发布成功后在个人中心的扎实效果如图1.15所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps15.jpg?raw=true) 

 

图1.15 作品发布成功

 

 

用户的新作品在首页中展示的效果如图1.16所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps16.jpg?raw=true) 

 

图1.16 自己作品在主页中展示

 

用户在发布作品以后，数据库会将用户的id存为videoId，这样做的好处是，能通过find方法查找到所有videoid相同的视频信息，这就代表着是同一个作者发布的。这些数据将展示在个人作品那一页。视频数据在数据库中的存储形式如图1.17所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps17.jpg?raw=true) 

 

图1.17 作品在数据库中的信息

 

作品发布成功后会将用户头像、作品封面、作品地址储存在临时存储空间中，开发者可以调用这些临时地址展示所需要的信息。如果用户在发布作品后更换了用户名或头像，那么可以通过videoId找到对应的用户，将它的最新用户名和头像更新到视频数据中来，这样就能保证视频数据的准确性。

用户在首页中观看到自己喜欢的视频的时候，会想将这个视频收藏起来，此时只需要点击右侧交互栏里的白色心型图标，若心型图标由白色变为红色，则代表着该视频已经收藏成功。然后用户到个人中心即可查看到自己收藏的作品，用户点赞收藏的视频在个人中心中展示的效果如图1.18所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps18.jpg?raw=true) 

 

图1.18 视频收藏列表效果

 

用户收藏的视频在数据库中的存储形式如图1.19所示：

 

![img](https://github.com/webdog369/README_FILE/blob/master/graduation_project_readme_images/wps19.jpg?raw=true) 

 

图1.19 数据库中存储的被收藏的视频

---

**基本功能介绍完毕**
