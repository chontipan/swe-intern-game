# Research mode

## เปิดใช้
```
https://chontipan.github.io/swe-intern-game/?mode=research&pid=P001
```
| พารามิเตอร์ | ความหมาย |
|---|---|
| `mode=research` | เปิดโหมดวิจัย (หน้าความยินยอม + บันทึก log) |
| `pid` | รหัสผู้เข้าร่วม ใช้รหัสเดียวกับใน Google Form pre/post (ถ้าไม่ใส่ ผู้เล่นกรอกเอง) |
| `group` | (ไม่บังคับ) รหัสกลุ่ม/section/รอบเก็บข้อมูล |
| `company` | (ไม่บังคับ) ล็อกบริษัท: `startup`, `bigcorp`, `softwarehouse`, `gov` ถ้าไม่ใส่จะสุ่มและบันทึกไว้ |
| `endpoint` | (ไม่บังคับ) URL Apps Script แทนค่าใน `RESEARCH_ENDPOINT` |

URL ปกติ (ไม่มี `mode=research`) เล่นได้ตามเดิม ไม่บันทึกอะไร

## ตั้งค่า Google Sheet
ดูวิธีในหัวไฟล์ `apps-script.gs` แล้ววาง URL `…/exec` ใน `RESEARCH_ENDPOINT` (index.html)

## ข้อมูลที่บันทึก (1 แถว/เหตุการณ์)
- `start` — เริ่มรอบ (role, company, ค่าเริ่มต้น)
- `choice` — ทุกสัปดาห์: week, choice_idx (1–3), ค่าสถานะ before/after, decision_ms, sent_back
- `ending` — ตอนจบ: week ที่จบ, ending_code, career_choice, ค่าสุดท้าย

`run_no` นับรอบที่เล่นต่อ pid — ใช้ `run_no = 1` เป็นข้อมูลหลัก

`ending_code`: `sent_back_w8_misconduct`, `medical_withdrawal`, `burnout`, `dismissal`, `offer_fulltime|parttime|bigtech|rest`, `in_debt`, `tech_lead`, `culture_champion`, `pass`, `survivor`

## สำรองข้อมูล
log เก็บซ้ำใน localStorage ของเครื่องผู้เล่น ปุ่ม "● REC · ดาวน์โหลด log" มุมขวาล่างโหลดเป็น CSV ได้ (กรณีเน็ตหลุด)
