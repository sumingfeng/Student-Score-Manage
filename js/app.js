//;+(function($){

define(["jquery","underscore","backbone","selectui"],function($,_,Backbone){
	
	var Student = Backbone.Model.extend({
		
		validate: function (attrData) {
			
            for (var obj in attrData) {
				
                if (attrData[obj] == '') {
					
                    return obj + "不能为空";
					
                }
				
                if (obj == 'Score' && isNaN(attrData.Score)) {
					
                    return "分数必须是数字";
					
                }
            }
        }
	
	});
	
	var Students = Backbone.Collection.extend({
		
		model:Student
		
	});
	
	var students = new Students();
	
	var RenderView = Backbone.View.extend({
	
		tagName:"tr",
		
		initialize:function(){
		
			this.model.on("change",this.render,this);
			
			this.model.on("destroy",this.remove,this);
			
		},
		
		template: _.template($("#stuInfo_tpl").html()),
		
		events:{
		
			"dblclick td" : "editing",
			
			"blur input,select" :"inputBlur",
			
			"click .td-del" :"delete"
		},
		
		editing:function(e){
			
			$(e.currentTarget)
				
				.removeClass("show")
			
				.addClass("editing")
				
				.find("input,select").focus();
		
		},
		
		inputBlur:function(e){
			
			var target = $(e.currentTarget);
			
			target.parent().parent().removeClass("editing").addClass("show");
			
			var objdata = {};
			
			objdata[target.attr("name")] = target.val();
			
			this.model.set(objdata,{"validate":true});
		},
		
		delete:function(){
			
			this.model.destroy();
		},
		
		remove:function(){
			
			this.$el.remove();
		},
		
		render:function(){
		
			this.$el.html(this.template(this.model.toJSON()));
			
			this.setVal();
			
			return this;
			
		},
		
		setVal:function(){
			
			var mod = this.model;
			
			this.$el.find("input,select").each(function(){
			
				var _this = $(this);
				
				_this.val(mod.get(_this.attr("name")));
				
			})
		}
	});
	
	var AppView = Backbone.View.extend({
		
		el:".wrap",
		
		events:{
			
			"click #J_add":"newStu"
			
		},
		
		initialize:function(){
		
			students.bind("add",this.appData,this);
			
			 $("#StuID").val(Students.length + 1);
			
		},
		
		newStu:function(){
		
			var stuModel = new Student();
			
			var modelData = {};
			
			$("#Name,#Sex,#Score").each(function(){
				
				modelData[$(this).attr("name")] = $(this).val();
			});
			
			stuModel.bind('invalid', function (model, error) {
				
                $("#statusTip").show().html(error);
				
            });
            if (stuModel.set(modelData, { 'validate': true })) {
				
                students.add(stuModel);
				
                $("#statusTip").hide();
            }
			
		},
		
		appData:function(ss){
			
			ss.set({"StuID":ss.get("StuID") || students.length});
			
			console.log(ss.toJSON());
		
			var renderView = new RenderView({model:ss});
			
			$("#student_list").append(renderView.render().el);
			
			$('#Name,#Score').each(function () {
				
                $(this).val("");
				
            })
			
            $("#StuID").val(Students.length + 1);
			
		}
		
	
	});
	
	var appView = new AppView();

})
	
