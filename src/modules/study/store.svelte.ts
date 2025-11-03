import type {
  InsertAssignments,
  InsertClasses,
  InsertExams,
  SelectAssignments,
  SelectClasses,
  SelectExams,
} from '$lib/database/schema/study'
import { useDatabase } from '$lib/database'
import { assignments, classes, exams } from '$lib/database/schema/study'
import { eq } from 'drizzle-orm'

export const study = $state({
  items: [] as (SelectClasses)[],
  assignments: [] as SelectAssignments[],
  exams: [] as SelectExams[],
  // Day selection state
  selectedDay: (() => {
    // JS getDay(): 0=Sunday ... 6=Saturday. Convert to 0=Monday ... 6=Sunday used in schema.
    const d = new Date().getDay()
    return d === 0 ? 6 : d - 1
  })(),

  setDay(day: number) {
    this.selectedDay = day
  },
  nextDay() {
    this.selectedDay = (this.selectedDay + 1) % 7
  },
  prevDay() {
    this.selectedDay = (this.selectedDay + 6) % 7
  },
  get neighborDays(): { prev: number, current: number, next: number } {
    return {
      prev: (this.selectedDay + 6) % 7,
      current: this.selectedDay,
      next: (this.selectedDay + 1) % 7,
    }
  },

  get filteredItems(): SelectClasses[] {
    return this.items
      .filter(i => i.day == null || i.day === this.selectedDay)
      .sort((a, b) => (a.schedule ?? 0) - (b.schedule ?? 0))
  },

  async addItem(item: InsertClasses) {
    const { database } = await useDatabase()
    await database.insert(classes).values(item)
    await this.loadItems()
  },

  async updateItem(id: number, item: Partial<InsertClasses>) {
    const { database } = await useDatabase()
    await database.update(classes).set(item).where(eq(classes.id, id))
    await this.loadItems()
  },

  async removeItem(id: number) {
    const { database } = await useDatabase()
    await database.delete(classes).where(eq(classes.id, id))
    this.items = this.items.filter(item => item.id !== id)
  },

  async loadItems() {
    await Promise.all([this.loadClasses(), this.loadAssignments(), this.loadExams()])
  },

  async loadClasses() {
    const { database } = await useDatabase()
    this.items = await database.select().from(classes).all()
  },

  async loadAssignments() {
    const { database } = await useDatabase()
    this.assignments = await database.select().from(assignments).all()
  },

  async loadExams() {
    const { database } = await useDatabase()
    this.exams = await database.select().from(exams).all()
  },

  async addAssignment(item: InsertAssignments) {
    const { database } = await useDatabase()
    await database.insert(assignments).values(item)
    await this.loadAssignments()
  },

  async updateAssignment(id: number, item: Partial<InsertAssignments>) {
    const { database } = await useDatabase()
    await database.update(assignments).set(item).where(eq(assignments.id, id))
    await this.loadAssignments()
  },

  async removeAssignment(id: number) {
    const { database } = await useDatabase()
    await database.delete(assignments).where(eq(assignments.id, id))
    this.assignments = this.assignments.filter(assignment => assignment.id !== id)
  },

  async setAssignmentCompletion(id: number, completed: boolean) {
    await this.updateAssignment(id, { completed: completed ? 1 : 0 })
  },

  async addExam(item: InsertExams) {
    const { database } = await useDatabase()
    await database.insert(exams).values(item)
    await this.loadExams()
  },

  async updateExam(id: number, item: Partial<InsertExams>) {
    const { database } = await useDatabase()
    await database.update(exams).set(item).where(eq(exams.id, id))
    await this.loadExams()
  },

  async removeExam(id: number) {
    const { database } = await useDatabase()
    await database.delete(exams).where(eq(exams.id, id))
    this.exams = this.exams.filter(exam => exam.id !== id)
  },
})
