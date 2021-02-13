package kr.co.multicafe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.multicafe.dto.Cafe;
import kr.co.multicafe.service.CafeService;



@RestController //ResponseBody라는 것을 붙일 필요 없음
@RequestMapping(path="/api/cafe")
public class CafeRestController {
	@Autowired //Service에게 데이터 얻어오는 부분
	private CafeService cafeService;

	
//	public List<Cafe> listViewCafe();
//	public Cafe getCafe(int cafeId);
//	public int insertCafe(Cafe cafe);
//	public int deleteCafe(int cafeId);
	
	@GetMapping
	public List<Cafe> listViewCafe(){
		return cafeService.listViewCafe();
	}
	
	@GetMapping("/{cafeId}")
	public Cafe getCafe(@PathVariable(name="cafeId")int cafeId) {
		return cafeService.getCafe(cafeId);
	}
	
	@PostMapping
	public void insertCafe(@RequestBody Cafe cafe) {
		cafeService.insertCafe(cafe);
	}
	
	@DeleteMapping("/{cafeId}")
	public void deleteCafe(@PathVariable(name="cafeId")int cafeId) {
		cafeService.deleteCafe(cafeId);
	}
}
