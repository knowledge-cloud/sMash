<?php
/*author:   OuyangYutong
  function: Obtain the info from douban
*/

class douban{

	function getMovieInfo($inputValues,$outputNames)
	{
		echo douabn;
		var_dump( $inputValues);
		$testResult['name'] = $inputValues[0];
		return $testResult;
	}
	
  function array_remove(&$arr,$offset){  
       array_splice($arr,$offset,1);  
    }  

	
	//搜索链接
function search_link($moviename)
{
		
     //构造url，其中max-results可根据需要更改
        $urlString = 'http://api.douban.com/movie/subjects?q='.$moviename.'&start-index=1&max-results=1&alt=json';
	      $urlString=mb_convert_encoding($urlString, "UTF-8", "GBK");//将Url转换为utf-8编码
        $r = new HttpRequest($urlString,HttpRequest::METH_GET);//请求
        $response = $r->send();
        $result = $r->getResponseBody();
        $obj = json_decode($result);//解析成json格式

		if($entry = @$obj->{'entry'}){
				//搜索链接并存在数组中返回
				for($i = 0;$i<sizeof($entry);$i++){
						$link=$entry[$i]->{'link'}; 
						for($j = 0;$j<sizeof($link);$j++){
							  $arr = (array)$link[$j];
							  $key = array_search("self",$arr);
							 // echo $key;
							  if($key){									//判断key是否存在
								  $str = $arr["@href"].'?alt=json'; //构造返回链接的格式
								  break;
						
							  }	
						}
						$link_array[] = $str;
				}
				return $link_array;//返回链接
		} else
				echo"Douban failed!";
				}
				
		//查询链接并将各变量放入$GLOBAL 数组
function get_info($urlString)
{
        $r = new HttpRequest($urlString,HttpRequest::METH_GET);
        $response = $r->send();
        $result = $r->getResponseBody();
		
		//if..else.. 判断打开链接是否为空
        if ($obj = json_decode($result)){
        	// var_dump($obj);
		    //将影片的信息放在全局数组中
			$title_temp = $obj->{'title'};
			$title = $title_temp->{'$t'};
			$author_temp = $obj->{'author'};
			foreach ($author_temp as $a)
				foreach ($a as $b)
				   $author[] = $b->{'$t'};

			$summary_temp = $obj->{'summary'};

			$summary = $summary_temp->{'$t'};
			echo $summary;

			$ID_temp = $obj->{'id'};
			$ID_temp = $ID_temp->{'$t'};
		 	$ID = explode("/", $ID_temp); 
		 	$ID = $ID[sizeof($ID)-1];
			
			$link_temp = $obj->{'link'};
			foreach ($link_temp as $a){
				foreach ($a as $b){
					$link[] = $b;
				}
			}
			
			$gd = (array)$obj->{'gd:rating'};	
			$gd['numRaters'] = $gd['@numRaters'];
			$gd['average'] = $gd['@average'];
			$gd['max'] = $gd['@max'];
			$gd['min'] = $gd['@min'];
		 
			
			$db_array = array();
			$db = $obj->{'db:attribute'};
			foreach ($db as $value){
				$value_array = (array)($value);
				$v = $value_array["@name"];
				$k = $value_array["\$t"];
				if (array_key_exists("@lang",$value_array)){
				    $lang=$value_array["@lang"];
					$k=$k.'['.$lang.']';
				}		
			    $db_array[$v][]=$k; 
			}
			return $title;
			
			//设定对应数组的键值
			@$db_array_key = array('[name]','[alias]','[director]','[scenario]','[tomlive]','[IMDB link]','[Product]',
			                   '[country]','[type]','[release date]','[Show length]','[Set Several]','[language]','[actor]');
			@$db_array_value = array($db_array["title"],$db_array["aka"],$db_array["director"],$db_array["writer"],$db_array["website"],
			                     $db_array["imdb"],$db_array["year"],$db_array["country"],$db_array["movie_type"],$db_array["pubdate"],
								 $db_array["movie_duration"],$db_array["episodes"],$db_array["language"],$db_array["cast"]);
								 
			
			@$db_array = array_combine($db_array_key,$db_array_value);
	    }   
	    else{
		        echo "Empty link!";
		}
		$info=array("title"=>$title,"author"=>$author,"summary"=>$summary,"ID"=>$ID,"link"=>$link,"gd"=>$gd,"db_array"=>$db_array);
	    
	
		}
	
}



   


	
