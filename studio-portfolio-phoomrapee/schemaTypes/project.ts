import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'ผลงาน (Project)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'ชื่อผลงาน (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'ลิงก์ URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'รายละเอียดโปรเจกต์ (Description)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'หมวดหมู่งาน (Category)',
      type: 'string',
      options: {
        list: [
          {title: 'Architectural Design', value: 'Architectural Design'},
          {title: 'Single-Storey Buildings', value: 'Single-Storey Buildings'},
          {title: '1.5-Storey Buildings', value: '1.5-Storey Buildings'},
          {title: 'Two-Storey Buildings', value: 'Two-Storey Buildings'},
          {title: 'Three-Storey Buildings', value: 'Three-Storey Buildings'},
          {title: 'Interior & Built-in', value: 'Interior & Built-in'},
          {title: 'Construction Management', value: 'Construction Management'},
          {title: 'Building Renovation', value: 'Building Renovation'},
          {title: 'Drafting & Documentation', value: 'Drafting & Documentation'},
          {title: 'Academic Projects', value: 'Academic Projects'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bedrooms',
      title: 'ห้องนอน (Bedrooms)',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'bathrooms',
      title: 'ห้องน้ำ (Bathrooms)',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'livingRooms',
      title: 'ห้องรับแขก (Living Rooms)',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'kitchens',
      title: 'ห้องครัว (Kitchens)',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'parking',
      title: 'โรงจอดรถ (Parking)',
      type: 'number',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'additionalFunctions',
      title: 'ฟังก์ชันเพิ่มเติม (Additional Functions)',
      description: 'ห้องหรือพื้นที่พิเศษอื่นๆ ที่ไม่ตายตัว เช่น ห้องพระ, ห้องเก็บของ, ห้องนั่งเล่น',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'รูปหน้าปก (Main Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'อัลบั้มรูปภาพเพิ่มเติม (Gallery)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
})
