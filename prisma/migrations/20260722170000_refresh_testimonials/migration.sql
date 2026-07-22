UPDATE "Testimonial" SET "quote"=CASE "position"
WHEN 0 THEN 'Loved the quality.'
WHEN 1 THEN 'Exactly what I ordered.'
WHEN 2 THEN 'Fast delivery and premium hair.'
ELSE 'One of the best hair vendors.' END,
"name"=CASE "position"
WHEN 0 THEN 'Chioma Tiktok.'
WHEN 1 THEN 'Temitope O.'
WHEN 2 THEN 'Amaka E.'
ELSE 'Adebimpe A.' END;
