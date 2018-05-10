		var urlF="http://192.168.2.208:8080";
		var flag=1;
		$("#loader8").show();
		$.ajax({
				type:"post",
				url:urlF+urls,
				data:{
					"merchantid":"M1707041203250488",
					"pageIndex":pageIndex,
					"pageSize":pageSize
				},
				success:function(data){
					console.log(data);
					console.log(data.resultData);
					if(data.resultCode=="0000"){
						$("#loader8").hide();
						if(data.resultData.length==0){
							flag=0;
							$(".main-con").hide();
							$(".more").hide();
							$(".none").show();
						}else{
							vm.liLists=data.resultData;
							if(data.resultData.length>=parseInt(pageSize)){
								$(".more").show();
							}
						}
					}
				},
				error:function(){
					console.log("error");
				}
			});
			$(".more").bind('click',function(){
				pageIndex+=1;
				$(".more").hide();
				$(".loading").show();
				$.ajax({
						type: "post", 
						url: urlF+urls,
						data: {
							"merchantid":"M1707041203250488",
							"pageIndex":pageIndex,
							"pageSize":pageSize
						},
						success: function (data) { 
							console.log(data);
							$(".loading").hide();
							$(".more").show();
							if(data.resultCode=="0000"){
								vm.liLists=vm.liLists.concat(data.resultData);
								if(data.resultData.length<parseInt(pageSize)){
									$(".more").unbind('click');
									$(".more").html("没有更多了！")
								}
							}
						}
					});
			})