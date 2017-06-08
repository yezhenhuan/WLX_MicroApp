// dateFormat for JavaScript by yoshi ver-0.0.2

/*
 * Date.format(Date,formatString)
 * 	两个参数：
 * 		Date		：代表需格式化的Date对象
 * 		formatString：代表格式化的参照格式字符串
 * 		return		：返回值为转换后的字符串
 * 
 * 在参照格式字符串 formatString 中：
 * 	'YYYY'代表年，'MM'代表月，'DD'代表日，'YY'代表两位缩写年，'M'代表一位缩写月（二位不缩写），'D'代表一位缩写日（二位不缩写）
 * 	'HH'代表24小时制时，'hh'代表12小时制时，'mm'代表分，'ss'代表秒
 * 例1：
 * 	var date1 = Date.format(new Date(),'YYYY-MM-DD HH:mm:ss')
 * 得：
 * 	date1 = '2017-06-03 00:27:54'
 * 例2：
 * 	var date2 = Date.format(new Date(),'YYYY年MM月DD日')
 * 得：
 * 	date2 = '2017年06月03日'
 * 例3：
 * 	var date3 = Date.format(new Date(),'YY年M月D日 hh时mm分ss秒')
 * 得：
 * 	date3 = '17年6月13日 下午01时17分54秒'
 */

	Date.format = function(date,format){
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		
		if(format.indexOf('YYYY') == -1 &&
				format.indexOf('MM') == -1 &&
				format.indexOf('DD') == -1 &&
				format.indexOf('HH') == -1 &&
				format.indexOf('mm') == -1 &&
				format.indexOf('ss') == -1 &&
				format.indexOf('YY') == -1 &&
				format.indexOf('M') == -1 &&
				format.indexOf('D') == -1 &&
				format.indexOf('hh') == -1){
			throw("'"+format+"'"+'不是有效的格式');
		}
		//年
		if(format.indexOf('YYYY') != -1){
			format = format.replace(/YYYY/,year);
		}
		if(format.indexOf('YY') != -1){
			format = format.replace(/YY/,year.toString().substring(2,4));
		}
		//月
		if(format.indexOf('MM') != -1){
			if(month<10){
				month = add0(month);
			}
			format = format.replace(/MM/,month);
		}
		if(format.indexOf('M') != -1){
			format = format.replace(/M/,month);
		}
		//日
		if(format.indexOf('DD') != -1){
			if(day<10){
				day = add0(day);
			}
			format = format.replace(/DD/,day);
		}
		if(format.indexOf('D') != -1){
			format = format.replace(/D/,day);
		}
		//时
		if(format.indexOf('HH') != -1){
			if(hours<10){
				hours = add0(hours);
			}
			format = format.replace(/HH/,hours);
		}
		if(format.indexOf('hh') != -1){
			if(hours>12){
				hours-=12;
				if(hours<10){
					hours = add0(hours);
				}
				hours = '下午'+hours;
			} else {
				if(hours<10){
					hours = add0(hours);
				}
				hours = '上午'+hours;
			}
			
			format = format.replace(/hh/,hours);
		}
		//分
		if(format.indexOf('mm') != -1){
			if(minutes<10){
				minutes = add0(minutes);
			}
			format = format.replace(/mm/,minutes);
		}
		//秒
		if(format.indexOf('ss') != -1){
			if(seconds<10){
				seconds = add0(seconds);
			}
			format = format.replace(/ss/,seconds);
		}
		
		return format;
	}
	//给个位数的日期或者时间数字前面补零
	function add0(num){
		var nums = ['00','01','02','03','04','05','06','07','08','09'];
		return nums[num];
	}