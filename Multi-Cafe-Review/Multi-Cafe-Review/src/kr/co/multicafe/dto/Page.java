package kr.co.multicafe.dto;

import java.util.List;

public class Page {
	private int pageno;
	private int start;
	private int end;
	private int prev;
	private int next;
	private int startPageNum;
	private int endPageNum;
	private List<Menu> list;
	
	public Page(int pageno, int start, int end, int prev, int next, int startPageNum, int endPageNum) {
		super();
		this.pageno = pageno;
		this.start = start;
		this.end = end;
		this.prev = prev;
		this.next = next;
		this.startPageNum = startPageNum;
		this.endPageNum = endPageNum;
	}
	
	public int getPageno() {
		return pageno;
	}
	public void setPageno(int pageno) {
		this.pageno = pageno;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getEnd() {
		return end;
	}
	public void setEnd(int end) {
		this.end = end;
	}
	public int getPrev() {
		return prev;
	}
	public void setPrev(int prev) {
		this.prev = prev;
	}
	public int getNext() {
		return next;
	}
	public void setNext(int next) {
		this.next = next;
	}
	public List<Menu> getList() {
		return list;
	}
	public void setList(List<Menu> list) {
		this.list = list;
	}
	public int getStartPageNum() {
		return startPageNum;
	}
	public void setStartPageNum(int startPageNum) {
		this.startPageNum = startPageNum;
	}
	public int getEndPageNum() {
		return endPageNum;
	}
	public void setEndPageNum(int endPageNum) {
		this.endPageNum = endPageNum;
	}
	
}
