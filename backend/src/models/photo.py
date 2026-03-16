from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.db.session import Base


class Photo(Base):
    __tablename__ = "photos"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # 關聯：這張照片屬於哪一個大行程 (Trip)
    # 使用 CASCADE，如果行程刪了，照片紀錄也跟著刪除
    trip_id = Column(Integer, ForeignKey("trips.id", ondelete="CASCADE"), index=True)
    
    itinerary_item_id = Column(Integer, ForeignKey("itinerary_items.id", ondelete="CASCADE"))
    
    # 實體檔案路徑 (例如: /storage/original/2026/03/my_paris_trip.jpg)
    file_path = Column(String, nullable=False)
    
    # 縮圖路徑 (優化前端顯示速度，不用每次都載入原圖)
    thumbnail_path = Column(String, nullable=True)
    
    # --- AI 辨識區塊 ---
    # AI 生成的簡短描述 (例如: "在艾菲爾鐵塔前的合照，天氣晴朗")
    ai_description = Column(Text, nullable=True)
    
    # AI 提取的標籤 (存成字串，例如: "tower, sunny, blue sky"，之後可以用 split 轉 list)
    ai_tags = Column(String, nullable=True)
    
    # 時間戳記
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # 關聯設定
    trip = relationship("Trip", back_populates="photos")
    itinerary_item = relationship("ItineraryItem", back_populates="photos")